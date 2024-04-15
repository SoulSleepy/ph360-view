'use client'

import {
    Engine,
    Scene,
    ArcRotateCamera,
    Texture,
    StandardMaterial,
    Vector3,
    HemisphericLight,
    CreateSphere,
    Color3,
} from 'babylonjs'
import { useLayoutEffect, useRef } from 'react'
import { useAppSelector } from 'state/store'
import { NavigateMenu } from '../NavigateMenu'

export default function PhotoSphereViewer() {
    const { selectedPhoto } = useAppSelector((store) => store.photo)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useLayoutEffect(() => {
        const engine = new Engine(canvasRef.current, true)
        const scene = new Scene(engine)
        scene.imageProcessingConfiguration.exposure = 2

        const camera = new ArcRotateCamera(
            'camera',
            Math.PI / 2,
            Math.PI / 2,
            5,
            Vector3.Zero(),
            scene
        )
        camera.attachControl(canvasRef.current, true)
        camera.lowerBetaLimit = 0
        camera.upperBetaLimit = Math.PI
        camera.lowerRadiusLimit = 0.5
        camera.upperRadiusLimit = 5
        camera.wheelPrecision = 50

        const light = new HemisphericLight('light', new Vector3(0, 0, 0), scene)
        light.intensity = 1

        const photoSphere = CreateSphere(
            'photoSphere',
            { diameter: 10, segments: 64 },
            scene
        )
        photoSphere.scaling.y = -1

        const material = new StandardMaterial('photoSphereMaterial', scene)
        material.specularColor = new Color3(0, 0, 0)
        material.diffuseTexture = new Texture(selectedPhoto, scene)
        material.diffuseTexture.coordinatesMode =
            Texture.FIXED_EQUIRECTANGULAR_MODE
        material.backFaceCulling = false
        photoSphere.material = material

        engine.runRenderLoop(() => {
            scene.render()
        })

        return () => {
            engine.dispose()
        }
    }, [selectedPhoto])

    return (
        <>
            <canvas
                ref={canvasRef}
                touch-action='none'
                style={{ width: '100vw', height: '100vh' }}
            />
            <NavigateMenu />
        </>
    )
}

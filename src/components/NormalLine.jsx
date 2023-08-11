import React, {useRef} from 'react';
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";

const navPath = [
    {
        "x": 2.6,
        "y": 5.1,
        "z": -1.5
    },
    {
        "x": 2.8,
        "y": 5.1,
        "z": -1.3
    },
    {
        "x": 2.8,
        "y": 5.1,
        "z": 2.5
    },
    {
        "x": 2.6,
        "y": 5.1,
        "z": 2.7
    },
    {
        "x": -5.5,
        "y": 5.1,
        "z": 6
    },
    {
        "x": -5.7,
        "y": 5,
        "z": 6.4
    },
    {
        "x": -5.6,
        "y": 5,
        "z": 6.6
    },
    {
        "x": 6.4,
        "y": 1.1,
        "z": 6.5
    },
    {
        "x": 6.5,
        "y": 1.1,
        "z": 5.6
    },
    {
        "x": 6.5,
        "y": 1.1,
        "z": 3.1
    },
    {
        "x": 6.4,
        "y": 1.1,
        "z": 2.2
    },
    {
        "x": 0,
        "y": 1,
        "z": 0
    }
]

const NormalLine = (props) => {
    const ref = useRef();

    useFrame(() => {
        if (ref.current) {
            ref.current.geometry.setFromPoints([props.start, props.end].map((point) => new THREE.Vector3(...point)));
        }
    })
    return (
        <line ref={ref}>
            <bufferGeometry/>
            <lineBasicMaterial color="hotpink" linewidth={2}/>
        </line>
    )
};

export default NormalLine;
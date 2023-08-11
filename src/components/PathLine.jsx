import React, {useLayoutEffect, useMemo, useRef} from 'react';
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {BufferAttribute, BufferGeometry} from "three";

const PathLine = () => {
    const OFFSET = 0.2;
    const NavPath = [
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
    const line = useRef();

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(NavPath.length * 3), 3));
    for (let i = 0; i < NavPath.length; i++) {
        geometry.attributes.position.setXYZ(i, NavPath[ i ].x, NavPath[ i ].y + OFFSET, NavPath[ i ].z);
    }

    return(
        <line ref={line} geometry={geometry}>
            <lineBasicMaterial color={'red'} linewidth={10}/>
        </line>
    )
};

export default PathLine;
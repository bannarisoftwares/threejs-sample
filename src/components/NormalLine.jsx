import React, {useRef} from 'react';
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";

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
            <lineBasicMaterial color="hotpink"/>
        </line>
    )
};

export default NormalLine;
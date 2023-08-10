import React from 'react';

const Button = ({onClick}) => {
    const agentHeight = 1.0;
    const agentRadius = 0.25;
    return (
        <group position={[0, 3, 0]}>
            <mesh onClick={onClick} position={[0, agentHeight / 2, 0]}>
                <cylinderGeometry args={[agentRadius, agentRadius, agentHeight]}/>
                <meshPhongMaterial attach="material" color={"green"}/>
            </mesh>
        </group>
    );
};

export default Button;
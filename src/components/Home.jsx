import {Canvas} from "@react-three/fiber";
import Cylinder3d from "./Cylinder3d";
import IndoorMap from "./IndoorMap";
import React from "react";

function Home() {
    return (
        <>

            {/* Canvas 1 */}
            {/*<Canvas>*/}
            {/*    <pointLight position={[10, 10, 10]} />*/}
            {/*    <ambientLight />*/}
            {/*    <Cylinder3d position={[-1.2, 0, 0]} />*/}
            {/*    <Cylinder3d position={[1.2, 0, 0]} />*/}
            {/*</Canvas>*/}
            <div style={{width: "100vw", height: "100vh"}}>
                <Canvas>
                    <IndoorMap/>
                </Canvas>
            </div>


            {/*/!* Canvas 2 *!/*/}
            {/*<Canvas>*/}
            {/*    <pointLight position={[10, 10, 10]} />*/}
            {/*    <ambientLight intensity={0.5} />*/}
            {/*    <Cylinder3d position={[-1.2, 0, 0]} wireframe={true} />*/}
            {/*    <Cylinder3d position={[1.2, 0, 0]} wireframe={true} />*/}
            {/*</Canvas>*/}

            {/*/!* Canvas 3 *!/*/}
            {/*<Canvas>*/}
            {/*    <pointLight position={[10, 10, 10]} />*/}
            {/*    <ambientLight color={"red"} />*/}
            {/*    <Cylinder3d position={[-1.2, 0, 0]} />*/}
            {/*    <Cylinder3d position={[1.2, 0, 0]} />*/}
            {/*</Canvas>*/}

        </>
    );
}

export default Home;
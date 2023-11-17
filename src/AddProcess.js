    import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// import { Detailed } from '@react-three/drei'

const AddProcess = React.memo(({ coordinate, modelUrl }) => {

    const { scene } = useGLTF(modelUrl)
    const model = useMemo(() => scene.clone(), [scene]);

    // const box = new THREE.Box3().setFromObject(model);
    // const modelSize = box.getSize(new THREE.Vector3());
    // const width = (modelSize.x.toFixed(2)) * 1.1;
    // const height = (modelSize.y.toFixed(2)) * 1.1;
    // const length = (modelSize.z.toFixed(2)) * 1.1;

    return (
        <>
            <primitive
                frustumCulled={true}
                position={[coordinate.x, coordinate.y, coordinate.z]}
                scale={[5, 5, 5]}
                object={model}
            >
            </primitive>
        </>
    )
})

export default AddProcess;
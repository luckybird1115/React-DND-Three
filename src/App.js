
import './App.css';
import React, { useMemo, useEffect, useState } from 'react';
import { Canvas, useThree } from "@react-three/fiber";
import {  OrthographicCamera, MapControls } from "@react-three/drei";


import { useGLTF } from "@react-three/drei";
import { makeStyles } from "@mui/styles";
import { Html } from "@react-three/drei";
import Draggable from 'react-draggable';

const useStyles = makeStyles((props) => ({
  circleButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    background: "#FFFFFF",
    border: "2px solid #6F6F6F",
    boxShadow:
      "0px 1px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)",
    borderRadius: "24px",
    fontFamily: "'Poppins'",
    fontSize: "16px",
    // flex: "none",
    order: 0,
    flexGrow: 0,
    cursor: "pointer",
    justifyContent: "center",
    "&:disabled": {
      cursor: "default",
      opacity: 0.4,
    },
    "&:not([disabled])": {
      '&:hover': {
        background: "#FCEBEB",
        color: "#EE3126",
      }
    },
    transform: 'translate(-50%, -50%)'
  },
}));
const ArrowUI = (props) => {
  const {
    coordinate,
    direction,
    setPos,
    // setMoveStatus,
    // //setPos,
    // onUpdatePosition,
    // checkDrag,
  } = props;

  const classes = useStyles({ direction });
  const { size, viewport, camera } = useThree();
  const [moveIconPos, setMoveIconPos] = useState([coordinate.x, coordinate.y, coordinate.z])

  const trackPos = (data) => {
    console.log(size.width, size.height, viewport.width, viewport.height, size.width / viewport.width, "test")
    let tempPos = [coordinate.x, coordinate.y, coordinate.z]
    let canvasWidth = Math.abs(camera.right - camera.left);
    let canvasHeight = Math.abs(camera.top - camera.bottom);
    tempPos[0] = tempPos[0] + data.x / canvasWidth * viewport.width;
    tempPos[2] = tempPos[2] + data.y / canvasHeight * viewport.height;
    console.log(data.x, data.y, "move data", camera.left, camera.right, camera.top, camera.bottom)
    setMoveIconPos(tempPos)
    setPos(tempPos)
  };

  useEffect(() => {
    setMoveIconPos([coordinate.x, coordinate.y, coordinate.z])
  }, [coordinate])


  return (
    <>
      < Html style={{ position: "relative", transform: 'translate(-50%, -50%)' }}
        position={moveIconPos} >
        <Draggable
          onDrag={(e, data) => trackPos(data)}
        >
          <button className={classes.circleButton}
          >
            Test
          </button>
        </Draggable>
      </Html >
    </>
  )
}

const Scene = () => {

  const [pos, setPos] = useState([0, 0, 0])

  const { scene } = useGLTF("./COH_BWS_IV1.glb")
  const model = useMemo(() => scene.clone(), [scene]);


  return (
    <>
      <group>
        <primitive
          scale={[2, 1, 1]}
          position={pos}
          object={model}
        />
      </group>
      <ArrowUI
        coordinate={{ x: pos[0], y: pos[1], z: pos[2] }}
        setPos={setPos}
      />
    </>

  )
}

function App() {

  return (
    <div className="App">
      <Canvas
        shadows
        gl={{ localClippingEnabled: true }}
      >
        <ambientLight intensity={0.8} />
        {/* <OrbitControls position={[0, 10, 0]} /> */}
        <OrthographicCamera
          makeDefault
          zoom={50}
          position={[0, 10, 0]}
        />
        <MapControls
          enableDamping={true}
          dampingFactor={0.05}
          enableZoom={true}
          enableRotate={false}
          enablePan={false}
          panSpeed={2}
          minZoom={10}
          maxZoom={250}
        />
        <Scene />
      </Canvas >
    </div >
  );
}

export default App;

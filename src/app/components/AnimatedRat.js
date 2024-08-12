import React, { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

export default function AnimatedRat({ mousePosition }) {
  const ratRef = useRef();
  const gltf = useLoader(OBJLoader, '/assets/chef.obj');

  useFrame(() => {
    if (ratRef.current && mousePosition) {
      // Calculate the angle to look at the mouse
      const angle = Math.atan2(mousePosition.y - ratRef.current.position.y, mousePosition.x - ratRef.current.position.x);
      
      // Smoothly rotate the rat's head towards the mouse
      ratRef.current.rotation.y = THREE.MathUtils.lerp(ratRef.current.rotation.y, angle, 0.1);
    }
  });

  return (
    <primitive 
      object={gltf.scene} 
      ref={ratRef}
      scale={[0.5, 0.5, 0.5]} // Adjust scale as needed
      position={[0, 0, 0]}
    />
  );
}
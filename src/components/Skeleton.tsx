import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  animated?: boolean;
}

export default function Skeleton({ width, height, className, animated = true }: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${animated ? styles.animated : ''} ${className || ''}`}
      style={{ width, height }}
    />
  );
} 
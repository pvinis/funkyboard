import Stack from '@nkzw/stack';
import { Pressable } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import Text from 'src/ui/Text.tsx';

export type Point = {
  x: number;
  y: number;
};

export type CoordinateKey = {
  id: string;
  character: string;
  corners: Array<Point>;
};

type CoordinateKeyComponentProps = {
  keyData: CoordinateKey;
  onPress: (character: string) => void;
  scale?: number;
};

export default function CoordinateKeyComponent({
  keyData,
  onPress,
  scale = 1,
}: CoordinateKeyComponentProps) {
  const { id, character, corners } = keyData;

  // Scale all coordinates
  const scaledCorners = corners.map(corner => ({
    x: corner.x * scale,
    y: corner.y * scale,
  }));

  // Calculate bounding box
  const minX = Math.min(...scaledCorners.map(c => c.x));
  const maxX = Math.max(...scaledCorners.map(c => c.x));
  const minY = Math.min(...scaledCorners.map(c => c.y));
  const maxY = Math.max(...scaledCorners.map(c => c.y));

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const width = maxX - minX;
  const height = maxY - minY;

  // Convert corners to SVG polygon points string (relative to bounding box)
  const polygonPoints = scaledCorners
    .map(corner => `${corner.x - minX},${corner.y - minY}`)
    .join(' ');

  return (
    <Pressable
      onPress={() => onPress(character)}
      style={{
        position: 'absolute',
        left: minX,
        top: minY,
        width,
        height,
      }}
    >
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Polygon
          points={polygonPoints}
          fill="#ededed"
          stroke="#7e22ce"
          strokeWidth="2"
        />
      </Svg>

      {/* Text overlay */}
      <Stack
        alignCenter
        center
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width,
          height,
          pointerEvents: 'none',
        }}
      >
        <Text className="text-lg font-semibold uppercase color-text">
          {character}
        </Text>
      </Stack>
    </Pressable>
  );
}
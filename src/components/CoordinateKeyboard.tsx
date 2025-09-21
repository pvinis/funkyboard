import { Dimensions, View } from 'react-native';
import CoordinateKeyComponent, { type CoordinateKey } from './CoordinateKey.tsx';

type CoordinateKeyboardProps = {
  onKeyPress: (key: string) => void;
};

// Function to trace the complete outer perimeter of multiple rectangular keys
function findCompletePerimeter(keyIds: Array<string>, allKeys: Array<CoordinateKey>): Array<Point> {
  // Get all rectangles from the specified keys
  const rectangles: Array<{minX: number, maxX: number, minY: number, maxY: number}> = [];

  keyIds.forEach(keyId => {
    const key = allKeys.find(k => k.id === keyId);
    if (key) {
      const xs = key.corners.map(c => c.x);
      const ys = key.corners.map(c => c.y);
      rectangles.push({
        minX: Math.min(...xs),
        maxX: Math.max(...xs),
        minY: Math.min(...ys),
        maxY: Math.max(...ys)
      });
    }
  });

  if (rectangles.length === 0) return [];

  // Find the overall bounding box
  const globalMinX = Math.min(...rectangles.map(r => r.minX));
  const globalMaxX = Math.max(...rectangles.map(r => r.maxX));
  const globalMinY = Math.min(...rectangles.map(r => r.minY));
  const globalMaxY = Math.max(...rectangles.map(r => r.maxY));

  // Create a grid to mark occupied cells
  const stepX = 1; // Grid resolution
  const stepY = 1;
  const cols = Math.ceil((globalMaxX - globalMinX) / stepX) + 1;
  const rows = Math.ceil((globalMaxY - globalMinY) / stepY) + 1;
  const grid: Array<Array<boolean>> = Array(rows).fill(null).map(() => Array(cols).fill(false));

  // Mark all cells that are inside any rectangle
  rectangles.forEach(rect => {
    for (let y = rect.minY; y < rect.maxY; y += stepY) {
      for (let x = rect.minX; x < rect.maxX; x += stepX) {
        const gridX = Math.floor((x - globalMinX) / stepX);
        const gridY = Math.floor((y - globalMinY) / stepY);
        if (gridX >= 0 && gridX < cols && gridY >= 0 && gridY < rows) {
          grid[gridY][gridX] = true;
        }
      }
    }
  });

  // Trace the perimeter by following the outer edges
  const perimeter: Array<Point> = [];

  // For Q, A, W, S arrangement, manually create the perimeter
  // This creates the exact shape you want with 90-degree corners
  if (keyIds.includes('q') && keyIds.includes('a') && keyIds.includes('w') && keyIds.includes('s')) {
    const qKey = allKeys.find(k => k.id === 'q')!;
    const aKey = allKeys.find(k => k.id === 'a')!;
    const wKey = allKeys.find(k => k.id === 'w')!;
    const sKey = allKeys.find(k => k.id === 's')!;

    // Get coordinates
    const qMinX = Math.min(...qKey.corners.map(c => c.x));
    const qMaxX = Math.max(...qKey.corners.map(c => c.x));
    const qMinY = Math.min(...qKey.corners.map(c => c.y));
    const qMaxY = Math.max(...qKey.corners.map(c => c.y));

    const wMinX = Math.min(...wKey.corners.map(c => c.x));
    const wMaxX = Math.max(...wKey.corners.map(c => c.x));
    const wMinY = Math.min(...wKey.corners.map(c => c.y));
    const wMaxY = Math.max(...wKey.corners.map(c => c.y));

    const aMinX = Math.min(...aKey.corners.map(c => c.x));
    const aMaxX = Math.max(...aKey.corners.map(c => c.x));
    const aMinY = Math.min(...aKey.corners.map(c => c.y));
    const aMaxY = Math.max(...aKey.corners.map(c => c.y));

    const sMinX = Math.min(...sKey.corners.map(c => c.x));
    const sMaxX = Math.max(...sKey.corners.map(c => c.x));
    const sMinY = Math.min(...sKey.corners.map(c => c.y));
    const sMaxY = Math.max(...sKey.corners.map(c => c.y));

    // Trace the complete perimeter following only horizontal/vertical grid lines
    return [
      { x: qMinX, y: qMinY },  // Q top-left - start
      { x: wMaxX, y: qMinY },  // Go right to W top-right
      { x: wMaxX, y: wMaxY },  // Go down to W bottom-right
      { x: sMaxX, y: wMaxY },  // Go right to S top-right
      { x: sMaxX, y: sMaxY },  // Go down to S bottom-right
      { x: aMinX, y: sMaxY },  // Go left to A bottom-left
      { x: aMinX, y: aMinY },  // Go up to A top-left
      { x: qMinX, y: aMinY },  // Go left to Q bottom-left
      { x: qMinX, y: qMinY },  // Go up back to start
    ];
  }

  // For E, R, D, F arrangement, manually create the perimeter
  if (keyIds.includes('e') && keyIds.includes('r') && keyIds.includes('d') && keyIds.includes('f')) {
    const eKey = allKeys.find(k => k.id === 'e')!;
    const rKey = allKeys.find(k => k.id === 'r')!;
    const dKey = allKeys.find(k => k.id === 'd')!;
    const fKey = allKeys.find(k => k.id === 'f')!;

    // Get coordinates
    const eMinX = Math.min(...eKey.corners.map(c => c.x));
    const eMaxX = Math.max(...eKey.corners.map(c => c.x));
    const eMinY = Math.min(...eKey.corners.map(c => c.y));
    const eMaxY = Math.max(...eKey.corners.map(c => c.y));

    const rMinX = Math.min(...rKey.corners.map(c => c.x));
    const rMaxX = Math.max(...rKey.corners.map(c => c.x));
    const rMinY = Math.min(...rKey.corners.map(c => c.y));
    const rMaxY = Math.max(...rKey.corners.map(c => c.y));

    const dMinX = Math.min(...dKey.corners.map(c => c.x));
    const dMaxX = Math.max(...dKey.corners.map(c => c.x));
    const dMinY = Math.min(...dKey.corners.map(c => c.y));
    const dMaxY = Math.max(...dKey.corners.map(c => c.y));

    const fMinX = Math.min(...fKey.corners.map(c => c.x));
    const fMaxX = Math.max(...fKey.corners.map(c => c.x));
    const fMinY = Math.min(...fKey.corners.map(c => c.y));
    const fMaxY = Math.max(...fKey.corners.map(c => c.y));

    // Trace the complete perimeter following only horizontal/vertical grid lines
    return [
      { x: eMinX, y: eMinY },  // E top-left - start
      { x: rMaxX, y: eMinY },  // Go right to R top-right
      { x: rMaxX, y: rMaxY },  // Go down to R bottom-right
      { x: fMaxX, y: rMaxY },  // Go right to F top-right
      { x: fMaxX, y: fMaxY },  // Go down to F bottom-right
      { x: dMinX, y: fMaxY },  // Go left to D bottom-left
      { x: dMinX, y: dMinY },  // Go up to D top-left
      { x: eMinX, y: dMinY },  // Go left to E bottom-left
      { x: eMinX, y: eMinY },  // Go up back to start
    ];
  }

  // Fallback to simple bounding box for other combinations
  return [
    { x: globalMinX, y: globalMinY },
    { x: globalMaxX, y: globalMinY },
    { x: globalMaxX, y: globalMaxY },
    { x: globalMinX, y: globalMaxY },
  ];
}

// Standard QWERTY keyboard layout with coordinate definitions
// Each key is defined by its corner points (clockwise from top-left)
// Using smaller coordinates that will fit on screen
const baseKeys: Array<CoordinateKey> = [
  // Top row (QWERTYUIOP)
  {
    id: 'q',
    character: 'q',
    corners: [
      { x: 0, y: 0 },
      { x: 30, y: 0 },
      { x: 30, y: 40 },
      { x: 0, y: 40 },
    ],
  },
  {
    id: 'w',
    character: 'w',
    corners: [
      { x: 32, y: 0 },
      { x: 62, y: 0 },
      { x: 62, y: 40 },
      { x: 32, y: 40 },
    ],
  },
  {
    id: 'e',
    character: 'e',
    corners: [
      { x: 64, y: 0 },
      { x: 94, y: 0 },
      { x: 94, y: 40 },
      { x: 64, y: 40 },
    ],
  },
  {
    id: 'r',
    character: 'r',
    corners: [
      { x: 96, y: 0 },
      { x: 126, y: 0 },
      { x: 126, y: 40 },
      { x: 96, y: 40 },
    ],
  },
  {
    id: 't',
    character: 't',
    corners: [
      { x: 128, y: 0 },
      { x: 158, y: 0 },
      { x: 158, y: 40 },
      { x: 128, y: 40 },
    ],
  },
  {
    id: 'y',
    character: 'y',
    corners: [
      { x: 160, y: 0 },
      { x: 190, y: 0 },
      { x: 190, y: 40 },
      { x: 160, y: 40 },
    ],
  },
  {
    id: 'u',
    character: 'u',
    corners: [
      { x: 192, y: 0 },
      { x: 222, y: 0 },
      { x: 222, y: 40 },
      { x: 192, y: 40 },
    ],
  },
  {
    id: 'i',
    character: 'i',
    corners: [
      { x: 224, y: 0 },
      { x: 254, y: 0 },
      { x: 254, y: 40 },
      { x: 224, y: 40 },
    ],
  },
  {
    id: 'o',
    character: 'o',
    corners: [
      { x: 256, y: 0 },
      { x: 286, y: 0 },
      { x: 286, y: 40 },
      { x: 256, y: 40 },
    ],
  },
  {
    id: 'p',
    character: 'p',
    corners: [
      { x: 288, y: 0 },
      { x: 318, y: 0 },
      { x: 318, y: 40 },
      { x: 288, y: 40 },
    ],
  },

  // Middle row (ASDFGHJKL)
  {
    id: 'a',
    character: 'a',
    corners: [
      { x: 16, y: 45 },
      { x: 46, y: 45 },
      { x: 46, y: 85 },
      { x: 16, y: 85 },
    ],
  },
  {
    id: 's',
    character: 's',
    corners: [
      { x: 48, y: 45 },
      { x: 78, y: 45 },
      { x: 78, y: 85 },
      { x: 48, y: 85 },
    ],
  },
  {
    id: 'd',
    character: 'd',
    corners: [
      { x: 80, y: 45 },
      { x: 110, y: 45 },
      { x: 110, y: 85 },
      { x: 80, y: 85 },
    ],
  },
  {
    id: 'f',
    character: 'f',
    corners: [
      { x: 112, y: 45 },
      { x: 142, y: 45 },
      { x: 142, y: 85 },
      { x: 112, y: 85 },
    ],
  },
  {
    id: 'g',
    character: 'g',
    corners: [
      { x: 144, y: 45 },
      { x: 174, y: 45 },
      { x: 174, y: 85 },
      { x: 144, y: 85 },
    ],
  },
  {
    id: 'h',
    character: 'h',
    corners: [
      { x: 176, y: 45 },
      { x: 206, y: 45 },
      { x: 206, y: 85 },
      { x: 176, y: 85 },
    ],
  },
  {
    id: 'j',
    character: 'j',
    corners: [
      { x: 208, y: 45 },
      { x: 238, y: 45 },
      { x: 238, y: 85 },
      { x: 208, y: 85 },
    ],
  },
  {
    id: 'k',
    character: 'k',
    corners: [
      { x: 240, y: 45 },
      { x: 270, y: 45 },
      { x: 270, y: 85 },
      { x: 240, y: 85 },
    ],
  },
  {
    id: 'l',
    character: 'l',
    corners: [
      { x: 272, y: 45 },
      { x: 302, y: 45 },
      { x: 302, y: 85 },
      { x: 272, y: 85 },
    ],
  },

  // Bottom row (ZXCVBNM)
  {
    id: 'z',
    character: 'z',
    corners: [
      { x: 32, y: 90 },
      { x: 62, y: 90 },
      { x: 62, y: 130 },
      { x: 32, y: 130 },
    ],
  },
  {
    id: 'x',
    character: 'x',
    corners: [
      { x: 64, y: 90 },
      { x: 94, y: 90 },
      { x: 94, y: 130 },
      { x: 64, y: 130 },
    ],
  },
  {
    id: 'c',
    character: 'c',
    corners: [
      { x: 96, y: 90 },
      { x: 126, y: 90 },
      { x: 126, y: 130 },
      { x: 96, y: 130 },
    ],
  },
  {
    id: 'v',
    character: 'v',
    corners: [
      { x: 128, y: 90 },
      { x: 158, y: 90 },
      { x: 158, y: 130 },
      { x: 128, y: 130 },
    ],
  },
  {
    id: 'b',
    character: 'b',
    corners: [
      { x: 160, y: 90 },
      { x: 190, y: 90 },
      { x: 190, y: 130 },
      { x: 160, y: 130 },
    ],
  },
  {
    id: 'n',
    character: 'n',
    corners: [
      { x: 192, y: 90 },
      { x: 222, y: 90 },
      { x: 222, y: 130 },
      { x: 192, y: 130 },
    ],
  },
  {
    id: 'm',
    character: 'm',
    corners: [
      { x: 224, y: 90 },
      { x: 254, y: 90 },
      { x: 254, y: 130 },
      { x: 224, y: 130 },
    ],
  },

  // Space and backspace
  {
    id: 'space',
    character: ' ',
    corners: [
      { x: 64, y: 135 },
      { x: 224, y: 135 },
      { x: 224, y: 175 },
      { x: 64, y: 175 },
    ],
  },
  {
    id: 'backspace',
    character: '⌫',
    corners: [
      { x: 230, y: 135 },
      { x: 318, y: 135 },
      { x: 318, y: 175 },
      { x: 230, y: 175 },
    ],
  },
];

// Create the keyboard keys with the qaws and erdf combinations
const keyboardKeys: Array<CoordinateKey> = [
  // Combined QAWS key using outer boundary
  {
    id: 'qaws',
    character: 'qaws', // Show all four letters
    corners: findCompletePerimeter(['q', 'a', 'w', 's'], baseKeys),
  },

  // Combined ERDF key using outer boundary
  {
    id: 'erdf',
    character: 'erdf', // Show all four letters
    corners: findCompletePerimeter(['e', 'r', 'd', 'f'], baseKeys),
  },

  // Remove individual q, a, w, s, e, r, d, f keys and keep the rest
  ...baseKeys.filter(key => !['q', 'a', 'w', 's', 'e', 'r', 'd', 'f'].includes(key.id)),
];

export default function CoordinateKeyboard({ onKeyPress }: CoordinateKeyboardProps) {
  // Get screen dimensions to scale appropriately
  const screenWidth = Dimensions.get('window').width;
  const keyboardWidth = 320; // Total width needed for our coordinates
  const scale = Math.min(1, (screenWidth - 40) / keyboardWidth); // Leave 20px margin on each side

  // Calculate the total dimensions needed
  const maxX = Math.max(...keyboardKeys.flatMap(key => key.corners.map(c => c.x)));
  const maxY = Math.max(...keyboardKeys.flatMap(key => key.corners.map(c => c.y)));

  return (
    <View
      style={{
        width: (maxX + 20) * scale,
        height: (maxY + 20) * scale,
        position: 'relative',
        alignSelf: 'center',
        margin: 20,
      }}
    >
      {keyboardKeys.map(key => (
        <CoordinateKeyComponent
          key={key.id}
          keyData={key}
          onPress={onKeyPress}
          scale={scale}
        />
      ))}
    </View>
  );

  // Example of how to create custom shapes:
  // To make Q and W into one key, modify their corners to create a single shape:
  //
  // {
  //   id: 'qw',
  //   character: 'q',
  //   corners: [
  //     { x: 0, y: 0 },     // Q top-left
  //     { x: 105, y: 0 },   // W top-right
  //     { x: 105, y: 50 },  // W bottom-right
  //     { x: 0, y: 50 },    // Q bottom-left
  //   ],
  // },
}
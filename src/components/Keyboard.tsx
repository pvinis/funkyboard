import Stack, { VStack } from "@nkzw/stack"
import Key, { type KeyGroup } from "./Key.tsx"

type KeyboardProps = {
	onKeyPress: (key: string) => void
}

// QWERTY layout with flexible grouping
// You can easily modify this to group keys together
const keyboardLayout: Array<Array<KeyGroup | null>> = [
	[
		{ keys: ["q", "w"], width: 2 },
		{ keys: ["e"], width: 1 },
		{ keys: ["r"], width: 1 },
		{ keys: ["t"], width: 1 },
		{ keys: ["y"], width: 1 },
		{ keys: ["u"], width: 1 },
		{ keys: ["i"], width: 1 },
		{ keys: ["o", "p", "k", "l"], width: 2, rowSpan: 2 },
	],
	[
		{ keys: ["a"], width: 1 },
		{ keys: ["s"], width: 1 },
		{ keys: ["d"], width: 1 },
		{ keys: ["f"], width: 1 },
		{ keys: ["g"], width: 1 },
		{ keys: ["h"], width: 1 },
		{ keys: ["j"], width: 1 },
		null, // Placeholder for the spanning key above
	],
	[
		{ keys: ["z"], width: 1 },
		{ keys: ["x"], width: 1 },
		{ keys: ["c"], width: 1 },
		{ keys: ["v"], width: 1 },
		{ keys: ["b"], width: 1 },
		{ keys: ["n"], width: 1 },
		{ keys: ["m"], width: 1 },
	],
	[
		{ keys: [" "], width: 6 }, // Space bar
		{ keys: ["⌫"], width: 2 }, // Backspace
	],
]

export default function Keyboard({ onKeyPress }: KeyboardProps) {
	return (
		<VStack className="p-4" gap={8}>
			{keyboardLayout.map((row, rowIndex) => (
				<Stack className="justify-center" gap={0} key={rowIndex}>
					{row.map((keyGroup, keyIndex) => {
						if (keyGroup === null) {
							// Skip null placeholders (for spanning keys)
							return null
						}
						return (
							<Key
								key={`${rowIndex}-${keyIndex}`}
								keyGroup={keyGroup}
								onPress={onKeyPress}
							/>
						)
					})}
				</Stack>
			))}
		</VStack>
	)
}

// Example of how to group keys together:
// To make 'qw' as one key and 'as' as one key, you would modify the layout like this:
//
// const keyboardLayout: Array<Array<KeyGroup>> = [
//   [
//     { keys: ['q', 'w'], width: 2 },  // Combined qw key
//     { keys: ['e'], width: 1 },
//     { keys: ['r'], width: 1 },
//     // ... rest of the row
//   ],
//   [
//     { keys: ['a', 's'], width: 2 },  // Combined as key
//     { keys: ['d'], width: 1 },
//     { keys: ['f'], width: 1 },
//     // ... rest of the row
//   ],
//   // ... rest of the layout
// ];

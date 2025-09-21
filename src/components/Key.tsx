import Stack from "@nkzw/stack"
import { Pressable } from "react-native"
import { cx } from "src/lib/cx.tsx"
import Text from "src/ui/Text.tsx"

export type KeyGroup = {
	keys: Array<string>
	width?: number
	height?: number
	rowSpan?: number
}

type KeyProps = {
	keyGroup: KeyGroup
	onPress: (key: string) => void
}

export default function Key({ keyGroup, onPress }: KeyProps) {
	const { keys, width = 1, rowSpan = 1 } = keyGroup

	const handlePress = () => {
		if (keys.length === 1) {
			onPress(keys[0])
		} else {
			// For now, just use the first key when multiple keys are grouped
			onPress(keys[0])
		}
	}

	const baseHeight = 50
	const height = baseHeight * rowSpan + (rowSpan - 1) * 8 // 8 is gap between rows

	return (
		<Pressable
			className={cx(
				"border border-accent bg-subtle p-3",
				"active:bg-accent active:opacity-80",
			)}
			onPress={handlePress}
			style={{
				flex: width,
				height: height,
				minHeight: height
			}}
		>
			<Stack alignCenter center>
				{keys.length === 1 ? (
					<Text className="text-lg font-semibold uppercase">{keys[0]}</Text>
				) : (
					<Text className="text-sm font-semibold uppercase">
						{keys.join("")}
					</Text>
				)}
			</Stack>
		</Pressable>
	)
}

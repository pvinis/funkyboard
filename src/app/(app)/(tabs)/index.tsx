import { VStack } from "@nkzw/stack"
import { Stack as ExpoStack } from "expo-router"
import { fbt, fbs } from "fbtee"
import { useState } from "react"
import { ScrollView } from "react-native-gesture-handler"
import CoordinateKeyboard from "src/components/CoordinateKeyboard.tsx"
import Text from "src/ui/Text.tsx"

export default function Index() {
	const [typedText, setTypedText] = useState("")

	const handleKeyPress = (key: string) => {
		if (key === "⌫") {
			// Backspace
			setTypedText((prev) => prev.slice(0, -1))
		} else if (key === " ") {
			// Space
			setTypedText((prev) => prev + " ")
		} else {
			// Regular key
			setTypedText((prev) => prev + key)
		}
	}

	return (
		<>
			<ExpoStack.Screen
				options={{ title: String(fbs("Home", "Home header title")) }}
			/>
			<VStack flex1>
				<ScrollView style={{ flex: 1 }}>
					<VStack gap={16} padding>
						<Text className="text-center text-xl font-bold color-accent">
							<fbt desc="Greeting">Welcome to FunKyboard</fbt>
						</Text>

						<VStack gap={8}>
							<Text className="text-lg font-semibold">
								<fbt desc="Text display label">What you're typing:</fbt>
							</Text>
							<Text className="text-base bg-subtle p-4 rounded border min-h-[60px]">
								{typedText || (
									<Text className="italic color-gray-500">
										<fbt desc="Placeholder text">Start typing...</fbt>
									</Text>
								)}
							</Text>
						</VStack>
					</VStack>
				</ScrollView>

				<CoordinateKeyboard onKeyPress={handleKeyPress} />
			</VStack>
		</>
	)
}

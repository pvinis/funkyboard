import { VStack } from "@nkzw/stack"
import { Stack as ExpoStack } from "expo-router"
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
			<ExpoStack.Screen options={{ title: "Home header title" }} />
			<VStack flex1>
				<ScrollView style={{ flex: 1 }}>
					<VStack gap={16} padding>
						<Text className="text-center text-xl font-bold color-accent">
							Welcome to FunKyboard
						</Text>

						<VStack gap={8}>
							<Text className="text-lg font-semibold">hat youre typing:</Text>
							<Text className="min-h-[60px] rounded border bg-subtle p-4 text-base">
								{typedText || (
									<Text className="color-gray-500 italic">Start typing...</Text>
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

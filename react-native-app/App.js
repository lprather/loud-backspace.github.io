/*//Basic React Native Stuff
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

//Menu Stuff
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

//Vector Icons
import Icon from 'react-native-vector-icons/Ionicons';

//Importing project pages/tabs/content
import RoommateFinder from './pages/RoommateFinder';
import ContentArea from './pages/components/ContentArea';
import ExpandableIcon from './pages/components/OverlayComponents/Menu/ExpandableIcon';

//Importing standard stylesheet
import PageLayouts from '@PageLayouts';

function DashboardScreen(){
	return(
		<ContentArea
			content={
				<Text>TODO Dashboard Screen</Text>
			}
		/>
	);
}

function ProfileScreen(){
	return(
		<ContentArea
			content={
				<Text>TODO Profile Screen</Text>
			}
		/>
	);
}

function CalendarScreen(){
	return(
		<ContentArea
			content={
				<Text>TODO Calendar Screen</Text>
			}
		/>
	);
}

function ChatScreen(){
	return(
		<ContentArea
			content={
				<Text>TODO Chat Screen</Text>
			}
		/>
	);
}

function RoommateFinderScreen(){
	return(
		<ContentArea content={<RoommateFinder/>}/>
	);
}

function RemindersScreen(){
	return(
		<ContentArea content={
			<Text>TODO Reminder Screen</Text>
		}/>
	);
}

const Drawer = createDrawerNavigator();

export default function App() {
	//either have the sidebar width be 70 or 200
	let sidebarWidth = 200;
	
	return (
		<NavigationContainer>
			<Drawer.Navigator 
				initialRouteName="Dashboard"
				screenOptions={{
					drawerStyle: {
						width: sidebarWidth
					},
				}}
			>
				<Drawer.Screen 
					name="Dashboard"
					component={DashboardScreen}
					options={{
						drawerLabel: "",
						drawerIcon: ({color}) => (
							<ExpandableIcon
								icon="home"
								label="Dashboard"
								side="left"
								width={sidebarWidth}
								color={color}
							/>
						)
					}}
				/>
				<Drawer.Screen 
					name="My Profile"
					component={ProfileScreen}
					options={{
						drawerLabel: "",
						drawerIcon: ({color}) => (
							<ExpandableIcon
								icon="person"
								label="My Profile"
								side="left"
								width={sidebarWidth}
								color={color}
							/>
						)
					}}
				/>
				<Drawer.Screen 
					name="Roommate Finder"
					component={RoommateFinderScreen}
					options={{
						drawerLabel: "",
						drawerIcon: ({color}) => (
							<ExpandableIcon
								icon="search"
								label="Roommate Finder"
								side="left"
								width={sidebarWidth}
								color={color}
							/>
						)
					}}
				/>
				<Drawer.Screen 
					name="Chat"
					component={ChatScreen}
					options={{
						drawerLabel: "",
						drawerIcon: ({color}) => (
							<ExpandableIcon
								icon="chatbubbles-outline"
								label="Chat"
								side="left"
								width={sidebarWidth}
								color={color}
							/>
						)
					}}
				/>
				<Drawer.Screen 
					name="Calendar"
					component={CalendarScreen}
					options={{
						drawerLabel: "",
						drawerIcon: ({color}) => (
							<ExpandableIcon
								icon="calendar-sharp"
								label="Calendar"
								side="left"
								width={sidebarWidth}
								color={color}
							/>
						)
					}}
				/>
				<Drawer.Screen 
					name="Reminders Screen" 
					component={RemindersScreen}
					options={{
						drawerLabel: "",
						drawerIcon: ({color}) => (
							<ExpandableIcon
								icon="checkbox-outline"
								label="Reminders"
								side="left"
								width={sidebarWidth}
								color={color}
							/>
						)
					}}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
*/
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";
import React from "react";

import { AuthContext } from "./context";

import DashBoardNavigation from "./pages/DashBoardNavigation/DashBoardNavigation";
import FinderNavigation from "./pages/FinderNavigation/FinderNavigation";
import ChatNavigation from "./pages/ChatNavigation/ChatNavigation";
import CalendarNavigation from "./pages/CalendarNavigation/CalendarNavigation";
import RemindersNavigation from "./pages/RemindersNavigation/RemindersNavigation";
import LoginNavigation from "./pages/LoginNavigation/LoginNavigation";
import AccountNavigation from "./pages/AccountNavigation/AccountNavigation";

import { View, Text, StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const isWeb = Platform.OS === "web";
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setLoginState] = React.useState(false);
  const dimensions = useWindowDimensions();
  const homeIcon = {};
  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setLoginState(true);
      },
    };
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {isLoggedIn ? (
          !isWeb ? (
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "dodgerblue",
                tabBarInactiveTintColor: "#888",
                tabBarStyle: {
                  backgroundColor: "white",
                },
              }}
            >
              <Tab.Screen
                name="Dashboard"
                component={DashBoardNavigation}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                      name={focused ? "home" : "home-outline"}
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Finder"
                component={FinderNavigation}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                      name={focused ? "search" : "search-outline"}
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Chat"
                component={ChatNavigation}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                      name={
                        focused
                          ? "chatbubble-ellipses"
                          : "chatbubble-ellipses-outline"
                      }
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Calendar"
                component={CalendarNavigation}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                      name={focused ? "calendar" : "calendar-outline"}
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Reminders"
                component={RemindersNavigation}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                      name={focused ? "checkbox" : "checkbox-outline"}
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
            </Tab.Navigator>
          ) : (
            <Drawer.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: "white",
                },
                drawerStyle: {
                  backgroundColor: "white",
                },
                drawerLabelStyle: {
                  fontSize: 30,
                  fontWeight: "bold",
                  textAlign: "left",
                  marginLeft: 0,
                },
                drawerItemStyle: {},
                drawerType: dimensions.width >= 768 ? "permanent" : "front",
                drawerActiveTintColor: "#28303F",
                drawerActiveBackgroundColor: "#AED1FF",
                drawerInactiveTintColor: "#444",
                drawerInactiveBackgroundColor: "transparent",
              }}
            >
              <Drawer.Screen
                name="Dashboard"
                component={DashBoardNavigation}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <Ionicons
                      name="md-home-outline"
                      size={25}
                      color={focused ? "#333" : "#555"}
                    />
                  ),
                }}
              />
              <Drawer.Screen
                name="Finder"
                component={FinderNavigation}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <Ionicons
                      name="md-search-outline"
                      size={25}
                      color={focused ? "#333" : "#555"}
                    />
                  ),
                }}
              />
              <Drawer.Screen
                name="Chat"
                component={ChatNavigation}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <Ionicons
                      name="md-chatbubbles-outline"
                      size={25}
                      color={focused ? "#333" : "#555"}
                    />
                  ),
                }}
              />
              <Drawer.Screen
                name="Calendar"
                component={CalendarNavigation}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <Ionicons
                      name="md-calendar-outline"
                      size={25}
                      color={focused ? "#333" : "#555"}
                    />
                  ),
                }}
              />
              <Drawer.Screen
                name="Reminders"
                component={RemindersNavigation}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <Ionicons
                      name="md-notifications-outline"
                      size={25}
                      color={focused ? "#333" : "#888"}
                    />
                  ),
                }}
              />
              <Drawer.Screen
                name="Account"
                component={AccountNavigation}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <Ionicons
                      name="md-person-outline"
                      size={25}
                      color={focused ? "#333" : "#888"}
                    />
                  ),
                }}
              />
            </Drawer.Navigator>
          )
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={LoginNavigation} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

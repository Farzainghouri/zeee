import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { db } from "./firebase.config";
import { collection, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

const Home = ({ navigation }) => {
  const [displayUser, setdisplayUser] = useState([]);
  const [myuid, setMyuid] = useState("");

  async function handleLogout() {
    await AsyncStorage.removeItem("uid");
    navigation.navigate("Login");
  }

  async function getUsers() {
    const uid = await AsyncStorage.getItem("uid");
    setMyuid(uid);
    const querySnapshot = await getDocs(collection(db, "users"));
    const list = querySnapshot.docs.map((doc) => doc.data());
    setdisplayUser(list);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Donate Blood</Text>
        <View style={styles.navbarActions}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.navbarButton}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.navbarButton}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.heroSection}>
          <Image
            style={styles.heroImage}
            source={{ uri: "https://media2.giphy.com/media/ZE6UWpyOlABOWeCIwl/giphy.gif?cid=6c09b952cohhq7jyy9o36h1z9ilqrnpoj74097ak34yzy3kn&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g" }}
          />
          <Text style={styles.heroTitle}>Make a Difference</Text>
          <Text style={styles.heroText}>
            Every donation helps save lives. Your contribution is crucial for
            medical emergencies and ongoing treatments.
          </Text>
        </View>

        <View style={styles.heroSection}>
          <Image
            style={styles.heroImage}
            source={{ uri: "https://media2.giphy.com/media/UqdVmCrJV7TYhe66EL/giphy.gif?cid=6c09b952b171xp1rk9m9otysy7462ru34fe5jdfwsf707jjj&ep=v1_gifs_search&rid=giphy.gif&ct=g" }}
          />
          <Text style={styles.heroTitle}>Make a Difference</Text>
          <Text style={styles.heroText}>
            Every donation helps save lives. Your contribution is crucial for
            medical emergencies and ongoing treatments.
          </Text>
        </View>

        <View style={styles.heroSection}>
          <Image
            style={styles.heroImage}
            source={{ uri: "https://media.tenor.com/AagDHSXzOb0AAAAM/affordable-healthcare-statue-of-liberty.gif" }}
          />
          <Text style={styles.heroTitle}>Make a Difference</Text>
          <Text style={styles.heroText}>
            Every donation helps save lives. Your contribution is crucial for
            medical emergencies and ongoing treatments.
          </Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => console.log("Request Blood")}>
            <Text style={styles.actionButtonText}>Request Blood</Text>
          </TouchableOpacity>
          <Image
            style={styles.heroImage}
            source={{ uri: "https://media2.giphy.com/media/ZE6UWpyOlABOWeCIwl/giphy.gif?cid=6c09b952cohhq7jyy9o36h1z9ilqrnpoj74097ak34yzy3kn&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g" }}
          />
          <TouchableOpacity style={styles.actionButton} onPress={() => console.log("Blood Groups")}>
            <Text style={styles.actionButtonText}>Explore Blood Groups</Text>
          </TouchableOpacity>
          <Image
            style={styles.heroImage}
            source={{ uri: "https://media.tenor.com/XXUwo9FToIAAAAAM/blood-letting-blood-donation.gif" }}
          />
          <TouchableOpacity style={styles.actionButton} onPress={() => console.log("Connect with Doctors")}>
            <Text style={styles.actionButtonText}>Connect with Doctors</Text>
          </TouchableOpacity>
        </View>

        {/* Users List */}
        <Text style={styles.userListTitle}>Available Donors</Text>
        <FlatList
          data={displayUser}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <Image
                style={styles.userAvatar}
                source={{ uri: "https://ih1.redbubble.net/image.4988510555.7520/raf,360x360,075,t,fafafa:ca443f4786.jpg" }} // Placeholder avatar image
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.Name}</Text>
                <Text style={styles.userDetails}>Blood Type: {item.BloodType || "Unknown"}</Text>
              </View>
              <TouchableOpacity
                style={styles.messageButton}
                onPress={() => navigation.navigate("chat", { client: { ...item, myuid } })}
              >
                <Text style={styles.messageButtonText}>Message</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007bff",
    height: 60,
    paddingHorizontal: 20,
    elevation: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  navbarTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  navbarActions: {
    flexDirection: "row",
  },
  navbarButton: {
    color: "#fff",
    fontSize: 14,
    marginHorizontal: 12,
    fontWeight: "500",
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  heroSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 4,
    marginBottom: 20,
    padding: 15,
    alignItems: "center",
  },
  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#007bff",
    textAlign: "center",
  },
  heroText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  actionContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  actionButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 8,
    width: '90%',
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  lottieView: {
    width: "100%",
    height: 150,
    marginVertical: 10,
  },
  userListTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 15,
    textAlign: "center",
  },
  userCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  userDetails: {
    fontSize: 14,
    color: "#777",
  },
  messageButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  messageButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default Home;

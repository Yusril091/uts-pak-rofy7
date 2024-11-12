import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header dan Foto Profil */}
      <View style={styles.headerContainer}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/150' }} 
          style={styles.profileImage} 
        />
        <Text style={styles.profileName}>Yusril Ramadani</Text>
        <Text style={styles.profileEmail}>yusril@example.com</Text>
      </View>

      {/* Informasi dan Pengaturan Akun */}
      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.infoButton}>
          <Icon name="person-outline" size={24} color="#4a4a4a" />
          <Text style={styles.infoText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoButton}>
          <Icon name="settings-outline" size={24} color="#4a4a4a" />
          <Text style={styles.infoText}>Account Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoButton}>
          <Icon name="notifications-outline" size={24} color="#4a4a4a" />
          <Text style={styles.infoText}>Notification Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoButton}>
          <Icon name="lock-closed-outline" size={24} color="#4a4a4a" />
          <Text style={styles.infoText}>Privacy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoButton}>
          <Icon name="log-out-outline" size={24} color="#ff4a4a" />
          <Text style={[styles.infoText, { color: '#ff4a4a' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    paddingVertical: 56,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 27,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 9,
  },
  profileName: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#777',
  },
  infoContainer: {
    width: '90%',
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  infoText: {
    fontSize: 18,
    color: '#4a4a4a',
    marginLeft: 15,
  },
});

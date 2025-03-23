// src/components/Profile.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  max-width: 1000px;
  margin: 1px auto;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
  padding-bottom: 1.0rem;
  border-bottom: 1px solid #eaeaea;
`;

const Title = styled.h1`
  color: #333;
  font-weight: 500;
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #c53030;
  }
`;

const ProfileSection = styled.section`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ProfileHeader = styled.div`
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-bottom: 1px solid #eaeaea;
`;

const ProfileBody = styled.div`
  padding: 1.5rem;
`;

const ProfileRow = styled.div`
  display: flex;
  margin-bottom: 1.25rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ProfileLabel = styled.div`
  width: 150px;
  font-weight: 500;
  color: #666;
`;

const ProfileValue = styled.div`
  flex: 1;
  color: #333;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #666;
`;

const ErrorMessage = styled.div`
  background-color: #fff5f5;
  color: #c53030;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

// Add these styled components with your other styled components
const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1.5rem;
  border: 3px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #333;
`;

const UserRole = styled.p`
  margin: 0;
  color: #666;
  font-size: 1rem;
`;

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = currentUser?.token;
        if (!token) throw new Error('No authentication token found');

        const response = await axios.get('http://localhost:8008/api/owner/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setProfileData(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <ProfileContainer>
      <Header>
        <Title>Event Owner Profile</Title>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {loading ? (
        <LoadingSpinner>Loading profile information...</LoadingSpinner>
      ) : (
        <ProfileSection>
          <ProfileHeader>
            <h2>Account Information</h2>
            <p>Manage your personal information and account details</p>
        </ProfileHeader>
          
        <ProfileBody>
            <AvatarSection>
                <Avatar>
                <AvatarImage 
                    src={profileData?.avatarUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(profileData?.username || currentUser?.user?.username || "User")} 
                    alt="Profile Avatar" 
                />
                </Avatar>
                <UserInfo>
                <UserName>{profileData?.username || currentUser?.user?.username}</UserName>
                <UserRole>Event Owner</UserRole>
                </UserInfo>
            </AvatarSection>
                        
            <ProfileRow>
                <ProfileLabel>Email</ProfileLabel>
                <ProfileValue>{profileData?.email || currentUser?.user?.email}</ProfileValue>
            </ProfileRow>
                        
            <ProfileRow>
                <ProfileLabel>Account ID</ProfileLabel>
                <ProfileValue>{profileData?.id || currentUser?.user?.id}</ProfileValue>
            </ProfileRow>
                        
            {profileData?.phoneNumber && (
                <ProfileRow>
                <ProfileLabel>Phone Number</ProfileLabel>
                <ProfileValue>{profileData.phoneNumber}</ProfileValue>
                </ProfileRow>
            )}
        </ProfileBody>
        </ProfileSection>
      )}
    </ProfileContainer>
  );
};

export default Profile;
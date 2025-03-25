import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import stadiumService from '../../services/stadiumService';
import { AuthContext } from '../../contexts/AuthContext';
import styled from 'styled-components';

const StadiumContainer = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eaeaea;
`;

const Title = styled.h1`
  color: #333;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #1d4ed8;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #e53e3e;
  
  &:hover {
    background-color: #c53030;
  }
`;

const StadiumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const StadiumCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const StadiumImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const StadiumInfo = styled.div`
  padding: 1.5rem;
`;

const StadiumName = styled.h2`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.5rem;
`;

const StadiumLocation = styled.p`
  margin: 0 0 1rem 0;
  color: #666;
`;

const StadiumCapacity = styled.p`
  margin: 0;
  color: #2563eb;
  font-weight: 500;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #666;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  background-color: #fff5f5;
  color: #c53030;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

// Mock data for initial display or if API fails
const mockStadiums = [
  {
    id: 1,
    name: "Olympic Stadium",
    location: "Downtown, City Center",
    capacity: 60000,
    image: "/stadium.png"
  },
  {
    id: 2,
    name: "Central Arena",
    location: "Westside, Metro Area",
    capacity: 45000,
    image: "/stadium.png"
  },
  {
    id: 3,
    name: "Riverside Stadium",
    location: "East District",
    capacity: 30000,
    image: "/stadium.png"
  },
  {
    id: 4,
    name: "Victory Field",
    location: "North Suburb",
    capacity: 25000,
    image: "/stadium.png"
  }
];

const StadiumList = () => {
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const data = await stadiumService.getStadiums();
        setStadiums(data);
      } catch (err) {
        console.error('Error fetching stadiums:', err);
        setError('Failed to load stadiums. Using example data instead.');
        // Use mock data if the API fails
        setStadiums(mockStadiums);
      } finally {
        setLoading(false);
      }
    };

    fetchStadiums();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleStadiumClick = (stadiumId) => {
    navigate(`/create-event/${stadiumId}`);
  };

  return (
    <StadiumContainer>
      <Header>
        <Title>Available Stadiums</Title>
        <ButtonGroup>
          <Button onClick={handleProfileClick}>My Profile</Button>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </ButtonGroup>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {loading ? (
        <LoadingSpinner>Loading stadiums...</LoadingSpinner>
      ) : (
        <StadiumGrid>
          {stadiums.map((stadium) => (
            <StadiumCard 
              key={stadium.id} 
              onClick={() => handleStadiumClick(stadium.id)}
            >
              <StadiumImage src={stadium.image || "/stadium.png"} alt={stadium.name} />
              <StadiumInfo>
                <StadiumName>{stadium.name}</StadiumName>
                <StadiumLocation>{stadium.location}</StadiumLocation>
                <StadiumCapacity>Capacity: {stadium.size ? stadium.size.toLocaleString() : 'Unknown'} seats</StadiumCapacity>              </StadiumInfo>
            </StadiumCard>
          ))}
        </StadiumGrid>
      )}
    </StadiumContainer>
  );
};

export default StadiumList;
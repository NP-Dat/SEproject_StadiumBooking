import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CreateEventContainer = styled.div`
  max-width: 1000px;
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
  background-color: #f3f4f6;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #e5e7eb;
  }
`;

const ComingSoonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
`;

const ComingSoonTitle = styled.h2`
  color: #3b82f6;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ComingSoonText = styled.p`
  color: #4b5563;
  font-size: 1.2rem;
  max-width: 600px;
  line-height: 1.6;
`;

const StadiumImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-top: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CreateEvent = () => {
  const { stadiumId } = useParams();
  const navigate = useNavigate();

  const handleBackToStadiums = () => {
    navigate('/stadiums');
  };

  const handleBackToProfile = () => {
    navigate('/profile');
  };

  return (
    <CreateEventContainer>
      <Header>
        <Title>Create New Event</Title>
        <ButtonGroup>
          <Button onClick={handleBackToStadiums}>Back to Stadiums</Button>
          <Button onClick={handleBackToProfile}>Back to Profile</Button>
        </ButtonGroup>
      </Header>

      <ComingSoonSection>
        <ComingSoonTitle>Coming Soon!</ComingSoonTitle>
        <ComingSoonText>
          The event creation feature for Stadium #{stadiumId} is currently under development. 
          Soon you'll be able to create and manage your own events at this location.
        </ComingSoonText>
        <StadiumImage src="/stadium.png" alt="Stadium" />
      </ComingSoonSection>
    </CreateEventContainer>
  );
};

export default CreateEvent;
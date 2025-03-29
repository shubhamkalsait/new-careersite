import { Container, Typography, Button, Box, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Career Portal
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Find your dream job or post new opportunities
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <WorkIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Looking for a Job?
              </Typography>
              <Typography paragraph>
                Browse through our latest job postings and find the perfect opportunity for your career growth.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/jobs')}
              >
                View Jobs
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <PersonIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Are you an Admin?
              </Typography>
              <Typography paragraph>
                Post new job opportunities and manage applications through the admin dashboard.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate('/admin/dashboard')}
              >
                Admin Dashboard
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Home; 
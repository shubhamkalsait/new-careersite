import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Job {
  id: number;
  title: string;
  company: string;
}

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
    linkedIn: '',
    portfolio: '',
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const applicationData = {
        ...formData,
        jobId,
        applicationDate: new Date().toISOString(),
      };

      await axios.post('http://localhost:8081/api/applications', applicationData);
      navigate('/jobs', { state: { message: 'Application submitted successfully!' } });
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!job) {
    return (
      <Container>
        <Typography variant="h5" color="error">
          Job not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Apply for {job.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {job.company}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} component="div">
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} component="div">
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} component="div">
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} component="div">
              <TextField
                required
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} component="div">
              <TextField
                required
                fullWidth
                label="Resume Link"
                name="resume"
                placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                value={formData.resume}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} component="div">
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Cover Letter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} component="div">
              <TextField
                fullWidth
                label="LinkedIn Profile"
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} component="div">
              <TextField
                fullWidth
                label="Portfolio Website"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Submit Application
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/jobs')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ApplicationForm; 
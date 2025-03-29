import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Chip,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

const JobForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: [] as string[],
    type: 'Full-time',
    newRequirement: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddRequirement = () => {
    if (formData.newRequirement.trim()) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, formData.newRequirement.trim()],
        newRequirement: '',
      });
    }
  };

  const handleDeleteRequirement = (index: number) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const jobData = {
        ...formData,
        postedDate: new Date().toISOString(),
      };
      delete jobData.newRequirement;

      await axios.post('http://localhost:8080/api/jobs', jobData);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Post New Job
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Job Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Job Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                required
                fullWidth
                label="Job Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                {jobTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Add Requirement"
                  name="newRequirement"
                  value={formData.newRequirement}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddRequirement();
                    }
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={handleAddRequirement}
                  sx={{ mt: 1 }}
                >
                  Add Requirement
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.requirements.map((req, index) => (
                  <Chip
                    key={index}
                    label={req}
                    onDelete={() => handleDeleteRequirement(index)}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Post Job
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/admin/dashboard')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default JobForm; 
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://qlwqspxlzczqplzvilcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsd3FzcHhsemN6cXBsenZpbGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1ODMzMjcsImV4cCI6MjAzMzE1OTMyN30.6_x449Ovmb8Kk18LpFcYv-sS_0HCxwbR1GSctoLWw8s';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;

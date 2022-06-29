import 'dotenv/config';
import app from './app';

app.listen(process.env.PORT || 3030, () => {
  console.log(`API running ON PORT ${process.env.PORT}...`);
});

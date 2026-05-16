import React from 'react';
import { Box, FormControlLabel, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BoltIcon from '@mui/icons-material/Bolt';

interface PaymentMethodSectionProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

const BlikBadge: React.FC = () => (
  <Box
    sx={{
      width: 44,
      height: 24,
      borderRadius: 0.75,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 0.25,
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      color: '#fff',
      fontWeight: 700,
      fontSize: '0.7rem',
      letterSpacing: '0.5px',
    }}
  >
    <BoltIcon sx={{ fontSize: 14, color: '#facc15' }} />
    PAY
  </Box>
);

const PAYMENT_OPTIONS = [
  { value: 'card', label: 'Credit / Debit card', icon: <CreditCardIcon color="primary" /> },
  { value: 'blik', label: 'Instant transfer', icon: <BlikBadge /> },
  { value: 'bank', label: 'Traditional bank transfer', icon: <AccountBalanceIcon color="primary" /> },
];

const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({
  paymentMethod,
  setPaymentMethod,
}) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Payment method
      </Typography>
      <RadioGroup value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
        {PAYMENT_OPTIONS.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {option.icon}
                <Typography>{option.label}</Typography>
              </Box>
            }
            sx={{ my: 1 }}
          />
        ))}
      </RadioGroup>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Secure checkout powered by BookPlace. You will be charged only after the host confirms the
        reservation.
      </Typography>
    </Paper>
  );
};

export default PaymentMethodSection;

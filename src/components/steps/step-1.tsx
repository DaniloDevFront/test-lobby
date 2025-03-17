"use client";

import { Box, Grid2, Typography } from '@mui/material';
import { useRescueAwardsStore } from '@stores/state/redeem.store';
import GiftBox from "@components/cards/gift-box";

export default function Step1() {
  const { redeem, selectedAwards, handleSelect } = useRescueAwardsStore();

  return (
    <Box sx={{
      width:'100%',
    }}>
      <Typography variant="body2"  textAlign='center' fontSize='20px' fontWeight={600}>
        {redeem?.title}
      </Typography>

      <Grid2 container spacing={3} mt={4}>
        {redeem?.items.map((gift, index) => (
          <Grid2 key={index} size={{xs: 12, md: 4}} display="flex" justifyContent="center">
            <GiftBox
              id={gift.customer_product_id}
              title={gift.name}
              award={gift.image_url}
              isOptional={gift.optional}
              selectedIds={selectedAwards}
              onSelect={handleSelect}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}


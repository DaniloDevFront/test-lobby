"use client";

import { use, useEffect} from "react"; 
import { Box } from "@mui/material";
import LoadingSpinner from "@components/loading/spinner";
import CardPrimary from "@components/cards/card-primary";
import Step0 from "@components/steps/step-0";
import Step1 from "@components/steps/step-1";
import Step2 from "@components/steps/step-2";
import StepSuccess from "@components/steps/step-success";

import { useStepStore } from "@stores/state/control-step.store";
import { useRescueAwardsStore } from "@stores/state/redeem.store";

interface Props {
  params: Promise<{ id?: string }>; 
}

export default function Home({ params }: Props) {
  const { id } = use(params);
  const { step, handleStep } = useStepStore();
  const { setRedeemID, fetchRedeemByID, redeem, loading, error } = useRescueAwardsStore()

  useEffect(() => {
    if (!id) {
      handleStep(10);
      return
    }

    setRedeemID(id)
    fetchRedeemByID(id)
  }, [fetchRedeemByID, handleStep, id, setRedeemID]);


  const renderStep = () => {
    switch (step) {
      case 0:
        return <Step0 />;
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <StepSuccess />;
    }
  };

  return (
    <Box sx={{
      width: '100%',
      minHeight: '100%',
      height: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      background: redeem?.background_color
    }}>
      {loading && (
        <LoadingSpinner/>
      )}

      {!loading && !error && (
        <CardPrimary>
          {renderStep()}   
        </CardPrimary>
      )}
    </Box>
  );
}
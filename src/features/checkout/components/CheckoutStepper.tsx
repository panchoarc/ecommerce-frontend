interface Step {
  label: string;
}

interface CheckoutStepperProps {
  steps: Step[];
  currentStep: number;
}

const CheckoutStepper = ({ steps, currentStep }: CheckoutStepperProps) => {
  const getStepClass = (index: number): string => {
    if (index < currentStep) {
      return "bg-green-600 text-white";
    }
    if (index === currentStep) {
      return "bg-blue-600 text-white";
    }
    return "bg-gray-300 text-gray-700";
  };

  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center w-full">
          <div className="flex items-center w-full">
            <div className="flex flex-col items-center relative">
              <div
                className={`rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold ${getStepClass(index)}`}
              >
                {index + 1}
              </div>
            </div>

            {index !== steps.length - 1 && (
              <div className="flex-1 flex items-center self-center">
                <div
                  className={`h-1 w-full mx-2 ${
                    index < currentStep ? "bg-green-600" : "bg-gray-300"
                  }`}
                />
              </div>
            )}
          </div>

          <span className="mt-2 text-xs text-center">{step.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CheckoutStepper;

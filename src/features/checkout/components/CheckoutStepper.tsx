const CheckoutStepper = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center w-full">
          {/* Circulo + Linea */}
          <div className="flex items-center w-full">
            {/* Circulo */}
            <div className="flex flex-col items-center relative">
              <div
                className={`rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold
                  ${
                    index === currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  }
                `}
              >
                {index + 1}
              </div>
            </div>

            {/* Línea (solo si no es el último) */}
            {index != steps.length - 1 && (
              <div className="flex-1 flex items-center self-center">
                <div
                  className={`h-1 w-full mx-2 ${
                    index < currentStep ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckoutStepper;

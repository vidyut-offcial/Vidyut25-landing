// components/CarSelector.js
import { useRouter } from 'next/router';

const carModels = ['car.glb', 'car.glb', 'car.glb'];

export default function CarSelector() {
  const router = useRouter();

  const handleSelect = (model) => {
    router.push(`/show?model=${model}`);
  };

  return (
    <div>
      <h1>Select Your Car</h1>
      {carModels.map((model) => (
        <button key={model} onClick={() => handleSelect(model)}>
          {model}
        </button>
      ))}
    </div>
  );
}

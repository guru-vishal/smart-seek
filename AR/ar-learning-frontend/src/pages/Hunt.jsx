import ObjectHunt from '../components/ObjectHunt';

const Hunt = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">AR Object Hunt</h1>
      <p className="text-gray-600 mb-8">
        Complete fun challenges by finding objects that match specific criteria. Each successful 
        find will reveal AR animations and interesting facts.
      </p>
      <ObjectHunt />
    </div>
  );
};

export default Hunt;
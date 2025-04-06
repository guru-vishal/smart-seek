import ObjectScanner from '../components/ObjectScanner';

const Scan = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Object Scanner</h1>
      <p className="text-gray-600 mb-8">
        Point your camera at any object around you to learn its name, spelling, pronunciation, 
        and discover interesting facts about it.
      </p>
      <ObjectScanner />
    </div>
  );
};

export default Scan;
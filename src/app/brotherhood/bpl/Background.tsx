const Background = () => (
  <div className="fixed inset-0 -z-10 bg-black">
    {/* Purple top left */}
    <div className="absolute -top-24 -left-24 w-1/2 h-1/2 bg-purple-500 opacity-10 rounded-full blur-3xl" />

    {/* Blue bottom left */}
    <div className="absolute -bottom-24 -left-24 w-1/2 h-1/3 bg-blue-500 opacity-10 rounded-full blur-3xl" />

    {/* Pink top right */}
    <div className="absolute -top-36 -right-36 w-1/3 h-3/4 bg-pink-500 opacity-10 rounded-full blur-3xl" />

    {/* Azure center */}
    <div className="absolute top-1/2 left-1/2 w-full h-full bg-azure opacity-10 rounded-full blur-[200px] transform -translate-x-1/2 -translate-y-1/2" />
  </div>
);

export default Background;

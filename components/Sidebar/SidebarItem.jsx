export default function SidebarItem({ Icon, iconText }) {
  return (
    <div className="flex items-center space-x-2 hover:text-white">
      <Icon className="h-5 w-5"/>
      <p>{iconText}</p>
    </div>
  );
}

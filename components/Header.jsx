export default function Header(props) {

        return (
        <div className="w-full h-1/6 bg-gray-900">
        <div className="md:text-6xl text-center text-5xl mb-14 text-red-300 font-extrabold tracking-wider">{props.title}</div>
        </div>
              )

}
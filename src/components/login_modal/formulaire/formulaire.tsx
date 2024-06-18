export default function Formulaire() {
    return (
        <section className="w-full h-full">
            <div className="w-1/2 h-1/2 bg-white rounded-lg">
                <form className="flex flex-col w-full h-full justify-center items-center">
                    <input
                        type="text"
                        className="w-1/2 h-1/6 border-2 border-gray-400 rounded-lg p-2"
                        placeholder="Pseudo"
                    />
                    <input
                        type="password"
                        className="w-1/2 h-1/6 border-2 border-gray-400 rounded-lg p-2"
                        placeholder="Password"
                    />
                    <button className="w-1/2 h-1/6 bg-blue-500 text-white rounded-lg mt-4">
                        Login
                    </button>
                </form>
            </div>
        </section>
    );
}

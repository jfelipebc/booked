import useSwr from 'swr';
import Link from 'next/link'

const fetcher = (url) => fetch(url).then((res) => res.json())

function Bookmark() {
    const { data, error } = useSwr('/api/bookmarks', fetcher);

    if (error) return <div>Failed to load users</div>
    if (!data) return <div>Loading...</div>

    return (
        <div>
            <h1>Favourites</h1>
            <a href={data.url} target="__blank">
                <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <div className="md:flex">
                        <div className="flex-shrink-0">
                        <img className="h-48 w-auto object-cover" src={data.image} alt={data.description} />
                        </div>
                        <div className="p-4">
                            <h3 className="text-l font-semibold text-black">{data.title}</h3>
                            <p className="text-gray-500 text-sm">{data.description}</p>
                            <span>{data.site}</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Bookmark;
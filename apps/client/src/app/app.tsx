import { cn } from './utils/cn.util';

export function App() {
    const newClass = 'bg-red-900';

    return (
        <div>
            <button
                id="12"
                className={cn(
                    'bg-red btn btn-primary m-3 bg-green-800 pl-3',
                    newClass,
                    {
                        'bg-yellow-700': true,
                    },
                )}
            >
                Button
            </button>
        </div>
    );
}

export default App;

@extends('layouts.app')

@section('content')
    <div class="flex items-center justify-center min-h-screen bg-white">
        <div class="overflow-auto lg:overflow-visible">
            <div class="flex lg:justify-between border-b-2 border-fuchsia-900 pb-1 mb-10">
                <h2 class="text-2xl text-gray-500 font-bold">Bakery CRUD</h2>
                <form action="{{ route('goods.search') }}" method="GET" class="w-1/3">
                    @csrf
                    @method('GET')
                    <input type="text" name="search" placeholder="Search..." required class="w-2/3 py-2 border-b-2 border-blue-600 outline-none focus:border-yellow-400"/>
                    <button class="btn btn-primary rounded" type="submit">Search</button>
                </form>

                <div class="">
                    <form action="{{ route('store') }}" method="POST" class="inline">
                        @csrf
                        <button class="btn btn-default bg-purple-900 text-white hover:bg-purple-700" type="submit">Export</button>
                    </form>
                    <a class="btn btn-success" href="{{ route('goods.create') }}" title="Create a good">
                        Create new Good
                    </a>
                    <a class="btn btn-default bg-pink-800 text-white hover:text-white hover:bg-pink-700" href="{{ route('checkouts.index') }}" title="Checkouts">
                        Checkouts
                    </a>
                    <a class="btn btn-default bg-orange text-white hover:text-white hover:bg-orange-dark" href="{{ route('bakers.index') }}" title="Bakers">
                        Bakers
                    </a>
                    <a class="btn btn-default bg-secondary text-white hover:text-white hover:bg-secondary-dark" href="{{ route('bakery-type.index') }}" title="Bakery type">
                        Bakery type
                    </a>
                </div>
            </div>

            @if ($message = Session::get('success'))
                <div class="alert alert-success">
                    <p>{{ $message }}</p>
                </div>
            @endif

            <div class="flex">
                <div class="">
                    <form class="form-inline mr-10 bg-blue-500 px-5 py-2 text-white rounded mb-4" method="GET" action="{{ url('goods') }}">
                        <strong>Filters:</strong>
                        <div class="mt-4 mb-2">
                            <span>Bakery Type:</span>
                            <select name="bakery_type" id="bakery_type" class="form-control custom-select min-w-full">
                                <option value="">unset</option>
                                @foreach($bakery_types as $bakery_type)
                                    <option value="{{ $bakery_type->id }}" {{ request()->bakery_type != $bakery_type->id ?: 'selected' }}>{{ $bakery_type->type }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div>
                            <span>Baker:</span>
                            <select name="baker" id="baker" class="form-control custom-select">
                                <option value="">unset</option>
                                @foreach($bakers as $baker)
                                    <option value="{{ $baker->id }}" {{ request()->baker != $baker->id ?: 'selected' }}>{{ $baker->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="mt-4 flex justify-center justify-evenly">
                            <button type="submit" class="btn btn-default bg-red mb-2" onclick="
                            document.querySelectorAll('#baker, #bakery_type')
                                .forEach(select => select.value = 'unset')">
                                Reset
                            </button>
                            <button type="submit" class="btn btn-default bg-green mb-2">Filter</button>
                        </div>
                    </form>
                </div>

                <table class="table text-gray-400 border-separate space-y-6 text-sm">
                    <thead class="bg-blue-500 text-white">
                    <tr>
                        <th class="p-3">@sortablelink('id')</th>
                        <th class="p-3 text-left">@sortablelink('Name')</th>
                        <th class="p-3 text-left">@sortablelink('Bakery Type')</th>
                        <th class="p-3 text-left">@sortablelink('Baker')</th>
                        <th class="p-3 text-left">@sortablelink('Price')</th>
                        <th class="p-3 text-left">@sortablelink('Count')</th>
                        <th class="p-3 text-left">@sortablelink('Created At')</th>
                        <th class="p-3 text-left">@sortablelink('Updated At')</th>
                        <th class="p-3 text-left">Action buttons</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach ($goods as $good)
                        <tr class="bg-indigo-200 lg:text-black">
                            <td class="p-3">{{ $good->id }}</td>
                            <td class="p-3 font-medium capitalize">{{ $good->name }}</td>
                            <td class="p-3">
                                {{ $good->bakery_type }}
                            </td>
                            <td class="p-3">
                                @foreach($bakers as $baker)
                                    @if($good->baker == $baker->id) {{ $baker->name }} @endif
                                @endforeach
                            </td>
                            <td class="p-3">
                                <span class="bg-green-400 text-gray-50 rounded-md px-2">{{ $good->price }} UAH</span>
                            </td>
                            <td class="p-3">
                                <span class="px-2">{{ $good->count }} pcs</span>
                            </td>
                            <td class="p-3">{{ date_format($good->created_at, 'jS M Y') }}</td>
                            <td class="p-3">{{ date_format($good->updated_at, 'jS M Y') }}</td>
                            <td class="p-3">
                                <form action="{{ route('goods.destroy', $good->id) }}" method="POST">
                                    @csrf
                                    @method('DELETE')

                                    <a href="{{ route('goods.show', $good->id) }}" class="text-green-500 hover:text-gray-100 mr-2">
                                        <i class="material-icons-outlined text-base">show</i>
                                    </a>

                                    <a href="{{ route('goods.edit', $good->id) }}" class="text-yellow-400 hover:text-gray-100 mx-2">
                                        <i class="material-icons-outlined text-base">edit</i>
                                    </a>

                                    <button class="text-red-400 hover:text-gray-100 ml-2" type="submit" title="delete">
                                        <i class="material-icons-round text-base">delete</i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>

        </div>
    </div>

@endsection

@extends('layouts.app')

@section('content')
    <div class="flex items-center justify-center min-h-screen bg-white">
        <div class="overflow-auto lg:overflow-visible">
            <div class="flex lg:justify-between border-b-2 border-fuchsia-900 pb-1 mb-10">
                <h2 class="text-2xl text-gray-500 font-bold">Bakery CRUD Bakery Type</h2>
                <div class="ml-10">
                    <a class=" btn btn-success" href="{{ route('bakery-type.create') }}" title="Create a bakery type">
                        Create new bakery type
                    </a>
                    <a class=" btn btn-default bg-yellow text-black" href="{{ route('goods.index') }}" title="Goods">
                        Goods
                    </a>
                    <a class=" btn btn-default bg-orange" href="{{ route('bakers.index') }}" title="Bakers">
                        Bakers
                    </a>
                </div>
            </div>

            @if ($message = Session::get('success'))
                <div class="alert alert-success">
                    <p>{{ $message }}</p>
                </div>
            @endif

            @if ($message = Session::get('failed'))
                <div class="alert alert-danger">
                    <p>{{ $message }}</p>
                </div>
            @endif

            <div class="flex">
                <table class="table text-gray-400 border-separate space-y-6 text-sm">
                    <thead class="bg-blue-500 text-white">
                    <tr>
                        <th class="p-3">@sortablelink('id')</th>
                        <th class="p-3 text-left">@sortablelink('Type')</th>
                        <th class="p-3 text-left">Action buttons</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach ($bakeryTypes as $bakeryType)
                        <tr class="bg-indigo-200 lg:text-black">
                            <td class="p-3">{{ $bakeryType->id }}</td>
                            <td class="p-3 font-medium capitalize">{{ $bakeryType->type }}</td>
                            <td class="p-3">
                                <form action="{{ route('bakery-type.destroy', $bakeryType->id) }}" method="POST">
                                    @csrf
                                    @method('DELETE')

                                    <a href="{{ route('bakery-type.show', $bakeryType->id) }}" class="text-green-500 hover:text-gray-100 mr-2">
                                        <i class="material-icons-outlined text-base">show</i>
                                    </a>

                                    <a href="{{ route('bakery-type.edit', $bakeryType->id) }}" class="text-yellow-400 hover:text-gray-100 mx-2">
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

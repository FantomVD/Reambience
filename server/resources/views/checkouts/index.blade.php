@extends('layouts.app')

@section('content')
    <div class="flex items-center justify-center min-h-screen bg-white">
        <div class="overflow-auto lg:overflow-visible">
            <div class="flex lg:justify-between border-b-2 border-fuchsia-900 pb-1 mb-10">
                <h2 class="text-2xl text-gray-500 font-bold">Bakery CRUD Checkout</h2>
                <div class="ml-10">
                    <a class=" btn btn-success" href="{{ route('checkouts.create') }}" title="Create a checkout">
                        Create new checkout
                    </a>
                    <a class=" btn btn-default bg-yellow text-black" href="{{ route('goods.index') }}" title="Goods">
                        Goods
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
                        <th class="p-3 text-left">@sortablelink('name')</th>
                        <th class="p-3 text-left">@sortablelink('good')</th>
                        <th class="p-3 text-left">@sortablelink('count')</th>
                        <th class="p-3 text-left">Action buttons</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach ($checkouts as $checkout)
                        <tr class="bg-indigo-200 lg:text-black">
                            <td class="p-3">{{ $checkout->id }}</td>
                            <td class="p-3 font-medium capitalize">{{ $checkout->name }}</td>
                            <td class="p-3 font-medium capitalize">{{ $goods[$checkout->good - 1]->name }}</td>
                            <td class="p-3">{{ $checkout->count }}</td>
                            <td class="p-3">
                                <form action="{{ route('checkouts.destroy', $checkout->id) }}" method="POST">
                                    @csrf
                                    @method('DELETE')

                                    <a href="{{ route('checkouts.show', $checkout->id) }}" class="text-green-500 hover:text-gray-100 mr-2">
                                        <i class="material-icons-outlined text-base">show</i>
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

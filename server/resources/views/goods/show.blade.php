@extends('layouts.app')


@section('content')
    <div class="flex items-center justify-center min-h-screen bg-white">
        <div class="overflow-auto lg:overflow-visible">
            <div class="flex lg:justify-between border-b-2 border-fuchsia-900 pb-1 mb-10">
                <h2 class="text-2xl text-gray-500 font-bold">Bakery CRUD</h2>
                <div class="pull-right ml-10">
                    <a class="btn btn-primary" href="{{ route('goods.index') }}" title="Go back"> Back </a>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                        <strong>Name:</strong>
                        {{ $good->name }}
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                        <strong>Bakery Type:</strong>
                        @foreach($bakery_types as $bakery_type)
                            @if($good->bakery_type == $bakery_type->id) {{ $bakery_type->type }} @endif
                        @endforeach
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                        <strong>Baker:</strong>
                        @foreach($bakers as $baker)
                            @if($good->baker == $baker->id) {{ $baker->name }} @endif
                        @endforeach
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 flex">
                    <div class="form-group">
                        <strong>Price:</strong>
                        {{ $good->price }}
                    </div>
                    <div class="form-group ml-5">
                        <strong>Count:</strong>
                        {{ $good->count }}
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                        <strong>Description:</strong>
                        {{ $good->description }}
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                        <strong>Date Created:</strong>
                        {{ date_format($good->created_at, 'jS M Y') }}
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                        <strong>Date Updated:</strong>
                        {{ date_format($good->updated_at, 'jS M Y') }}
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection

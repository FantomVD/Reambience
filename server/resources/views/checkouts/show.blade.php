@extends('layouts.app')

@section('content')
    <div class="flex items-center justify-center min-h-screen bg-white">
        <div class="overflow-auto lg:overflow-visible">
            <div class="flex lg:justify-between border-b-2 border-fuchsia-900 pb-1 mb-10">
                <h2 class="text-2xl text-gray-500 font-bold">Bakery CRUD Bakers show</h2>
                <div class="pull-right ml-10">
                    <a class="btn btn-primary" href="{{ route('bakers.index') }}" title="Go back"> Back </a>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                        <strong>Type:</strong>
                        {{ $bakeryType->type }}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

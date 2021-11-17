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

            @if ($errors->any())
                <div class="alert alert-danger">
                    <strong>Whoops!</strong> There were some problems with your input.<br><br>
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form action="{{ route('goods.update', $good->id) }}" method="POST">
                @csrf
                @method('PUT')

                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="form-group">
                            <strong>Name:</strong>
                            <input type="text" name="name" value="{{ $good->name }}" class="form-control" placeholder="Name">
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="form-group">
                            <strong>Bakery Type:</strong>
                            <select name="bakery_type" class="form-control custom-select">
                                @foreach($bakery_types as $bakery_type)
                                    <option value="{{ $bakery_type->id }}" @if($bakery_type->id == $good->bakery_type) selected @endif>
                                        {{ $bakery_type->type }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="form-group">
                            <strong>Baker:</strong>
                            <select name="baker" class="form-control custom-select">
                                @foreach($bakers as $baker)
                                    <option value="{{ $baker->id }}" @if($baker->id == $good->baker) selected @endif>
                                        {{ $baker->name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="form-group">
                            <strong>Price:</strong>
                            <input type="number" id="price" name="price" min="0" max="1000" step="0.01" value="{{ $good->price }}">
                        </div>

                        <div class="form-group">
                            <strong>Count:</strong>
                            <input type="number" id="count" name="count" min="1" max="100" step="1" value="{{ $good->count }}">
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="form-group">
                            <strong>Description:</strong>
                            <textarea name="description" class="form-control" placeholder="Description">{{ $good->description }}</textarea>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection

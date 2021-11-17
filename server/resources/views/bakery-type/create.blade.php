@extends('layouts.app')

@section('content')
    <div class="flex items-center justify-center min-h-screen bg-white">
        <div class="overflow-auto lg:overflow-visible">
            <div class="flex lg:justify-between border-b-2 border-fuchsia-900 pb-1 mb-10">
                <h2 class="text-2xl text-gray-500 font-bold">Bakery CRUD Bakery type create</h2>
                <div class="pull-right ml-10">
                    <a class="btn btn-primary" href="{{ route('bakery-type.index') }}" title="Go back"> Back </a>
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
            <form action="{{ route('bakery-type.store') }}" method="POST" >
                @csrf

                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="form-group">
                            <strong>Type:</strong>
                            <input type="text" name="type" class="form-control" placeholder="Type">
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

@extends('layouts.app')

@section('content')
    <div class="flex items-center justify-center min-h-screen bg-white">
        <div class="overflow-auto lg:overflow-visible">
            <div class="flex lg:justify-between border-b-2 border-fuchsia-900 pb-1 mb-10">
                <h2 class="text-2xl text-gray-500 font-bold">Bakery CRUD checkout create</h2>
                <div class="pull-right ml-10">
                    <a class="btn btn-primary" href="{{ route('checkouts.index') }}" title="Go back"> Back </a>
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
            <form action="{{ route('checkouts.store') }}" method="POST" >
                @csrf

                <div class="row max-w-[720px]">
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="form-group">
                            <strong>Buyer name:</strong>
                            <input type="text" name="name" class="form-control" placeholder="Name">
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="form-group">
                            <strong>Goods:</strong>
                            <select name="good" class="form-control custom-select" onchange="selectChange(this)">
                                <option value="">Select Good</option>
                                @foreach($goods as $good)
                                    <option value="{{ $good->id }}">{{ $good->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="form-group" id="count-wrapper">
                            <strong>Count:</strong>
                            <span>No items available for this good!</span>
                        </div>
                        <div class="form-group">
                            <strong>Price:</strong>
                            <input type="number" id="price" name="price" min="0" max="1000" step="0.01" value="0" disabled>
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <script>
        let goods = {},
            good = null;

        @json($goods).forEach(good => {
            goods[good['id']] = good
            return good
        })

        function selectChange(select) {
            if (!select.value) {
                document.querySelector('#price').value = 0
                document.querySelector('#count-wrapper').innerHTML = '<strong>Count:</strong> <span>No items available for this good!</span>'
                return
            }

            good = goods[select.value]
            let counter = document.querySelector('#count-wrapper')

            if(good['count']) {
                counter.innerHTML = '<strong>Count:</strong> <input type="number" name="count" id="count" min="1" max="' + good['count'] + '" step="1" value="1" onchange="countChange(this)">'
            } else {
                counter.innerHTML = '<strong>Count:</strong> <span>No items available for this good!</span>'
            }

            countChange(document.querySelector('#count'))
        }

        function countChange(count) {
            document.querySelector('#price').value = good['price'] * (count?.value ?? 0)
        }
    </script>
@endsection

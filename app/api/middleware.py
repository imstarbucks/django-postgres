class TransactionStatusMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        response.data["trx_status"] = "success"  # Modify this as per your requirements
        return response

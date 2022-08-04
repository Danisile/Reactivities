
using MediatR;
using Persistence;
using Domain;

namespace Application.Activities
{
    public class Details
    {
        public class Query :IRequest<Activity>
        {
            private object value;

            public Query(object value)
            {
                this.value = value;
            }

            public Guid Id {get; set; }
        }
        public class Handler : IRequestHandler<Query, Activity>
        {
            private DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.FindAsync(request.Id);
            }
        }
    }
}
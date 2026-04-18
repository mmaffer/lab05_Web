const TicketService = require("../services/TicketService");
const service = new TicketService();

exports.create = async (req, res) => {
  const ticket = await service.createTicket(req.body);
  res.status(201).json(ticket);
};

exports.list = (req, res) => {
  const { page, limit } = req.query;
  const tickets = service.list(
    page ? Number(page) : undefined,
    limit ? Number(limit) : undefined
  );
  res.status(200).json(tickets);
};

exports.assign = async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const ticket = await service.assignTicket(id, user);
  if (!ticket) return res.status(404).json({ error: "Ticket no encontrado" });
  res.status(200).json(ticket);
};

exports.changeStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const ticket = await service.changeStatus(id, status);
  if (!ticket) return res.status(404).json({ error: "Ticket no encontrado" });
  res.status(200).json(ticket);
};

exports.delete = async (req, res) => {
  try {
    await service.deleteTicket(req.params.id);
    res.json({ message: "Ticket eliminado correctamente" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
exports.getNotificationsByTicket = (req, res) => {
  const { id } = req.params;
  const notifications = service.getNotificationsByTicket(id);
  res.status(200).json(notifications);
};
